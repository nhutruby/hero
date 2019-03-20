# frozen_string_literal: true

# Victor model
class Victor
  include Mongoid::Document
  field :name, type: String
  field :slug, type: String
  field :image_portrait, type: String
  field :image_splash, type: String
  field :updated_at, type: Time
  field :image_card_background, type: String

  # validation
  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
  validates :image_portrait, presence: true
  validates :image_splash, presence: true
  validates :updated_at, presence: true
  validates :image_card_background, presence: true
end
