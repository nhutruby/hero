# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::VictorsController, type: :controller do
  describe 'GET #index' do
    before(:each) do
      25.times do
        create :victor, name: Faker::Name.name, slug: Faker::Internet.slug
      end
    end
    it 'returns the products which are above or equal to the price' do
    end
  end
end
