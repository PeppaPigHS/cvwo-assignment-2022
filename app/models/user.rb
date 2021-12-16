class User < ApplicationRecord
    has_secure_password

    has_many :tasks

    validates :username, presence: true
    validates :username, uniqueness: { case_sensitive: false }
    validates :username, length: { minimum: 6 }

    validates :password, presence: true
    validates_confirmation_of :password
end
