# frozen_string_literal: true

# Victor model
class Victor
  include Mongoid::Document
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  index_name "victor-#{Rails.env}"

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
  validates :updated_at, presence: true

  def self.filter(params)
    victors = if params[:name].present?
                Victor.search(query: { match: { name: params[:name] } })
                      .page(params[:page]).per(params[:per_page])
              else
                Victor.all.page(params[:page]).per(params[:per_page])
              end
    victors
  end

  def as_indexed_json(_options = {})
    as_json(only: %i[name slug image_portrait updated_at image_splash image_card_background])
  end
end
