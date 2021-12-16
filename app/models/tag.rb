class Tag < ApplicationRecord
    has_many :taggings
    has_many :tasks, through: :taggings

    validates :name, presence: true
    validates :name, uniqueness: { message: "%{value} already exists" }
end
