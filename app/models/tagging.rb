class Tagging < ApplicationRecord
  belongs_to :tag, counter_cache: true
  belongs_to :task

  # Filter tasks by tag name
  def self.task_ids_by_tag(tag_name)
    joins(:tag).where(tags: { name: tag_name }).select(:task_id)
  end
end
