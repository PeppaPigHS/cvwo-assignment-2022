class Task < ApplicationRecord
  after_destroy :clean_up_tags

  belongs_to :user

  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  validates :user_id, presence: true
  validates :title, presence: true
  validates :status, presence: true
  validates_inclusion_of :status, in: 0..1, message: "Status must be either pending or done."

  # Filter tasks by tag name
  def self.by_tag(tag_name)
      where("id IN (#{Tagging.task_ids_by_tag(tag_name).to_sql})")
  end

  # Save tags (create new one if does not exist)
  def save_tags(tag_list)
    self.tags = tag_list.map do |t|
      Tag.where(name: t.strip).first_or_create!
    end
  end

  # Clean up tags that are no longer associated with any task after update or destroy request
  def clean_up_tags
      tags_to_delete = Tag.where('taggings_count = ?', 0).pluck(:id)
      Tag.find(tags_to_delete).map(&:destroy)
  end
end
