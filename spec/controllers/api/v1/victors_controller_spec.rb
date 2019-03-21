# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::VictorsController, type: :controller do
  describe 'GET #index' do
    before(:each) do
      Victor.__elasticsearch__.create_index! force: true
      @victor1 = create :victor, name: 'A plasma TV', slug: 'aplasmatv'
      Victor.__elasticsearch__.client.indices.refresh
    end
    context 'pagination' do
      before(:each) do
        get :index
      end
      it { expect(json_response).to have_key(:meta) }
      it { expect(json_response[:meta]).to have_key(:pagination) }
      it { expect(json_response[:meta][:pagination]).to have_key(:per_page) }
      it { expect(json_response[:meta][:pagination]).to have_key(:total_pages) }
      it { expect(json_response[:meta][:pagination]).to have_key(:total_objects) }
      it { should respond_with 200 }
    end
  end
end
RSpec.describe Api::V1::VictorsController, type: :controller do
  describe 'GET #index' do
    before(:each) do
      Victor.__elasticsearch__.create_index! force: true
      @victor1 = create :victor, name: 'A plasma TV', slug: 'aplasmatv'
      @victor2 = create :victor, name: 'Fastest Laptop', slug: 'fastestlaptop'
      @victor3 = create :victor, name: 'CD player', slug: 'cdplayer'
      @victor4 = create :victor, name: 'TV Samsung', slug: 'tvsamsung'
      @victor5 = create :victor, name: 'Iphone', slug: 'iphone'
      @victor6 = create :victor, name: 'Dell Laptop', slug: 'delllaptop'
      @victor7 = create :victor, name: 'A flat TV', slug: 'aflattv'
      @victor8 = create :victor, name: 'Slow Laptop', slug: 'slowlaptop'
      @victor9 = create :victor, name: 'A big TV', slug: 'abigtv'
      Victor.__elasticsearch__.client.indices.refresh
    end
    context 'when searching all victors' do
      before(:each) do
        get :index
      end
      it 'returns 5 records from the database' do
        victors_response = json_response
        expect(victors_response[:victors].count).to eq(5)
      end
    end
  end
end
RSpec.describe Api::V1::VictorsController, type: :controller do
  describe 'GET #index' do
    before(:each) do
      Victor.__elasticsearch__.create_index! force: true
      @victor1 = create :victor, name: 'A plasma TV', slug: 'aplasmatv'
      @victor2 = create :victor, name: 'Fastest Laptop', slug: 'fastestlaptop'
      @victor3 = create :victor, name: 'CD player', slug: 'cdplayer'
      @victor4 = create :victor, name: 'TV Samsung', slug: 'tvsamsung'
      @victor5 = create :victor, name: 'Iphone', slug: 'iphone'
      @victor6 = create :victor, name: 'Dell Laptop', slug: 'delllaptop'
      @victor7 = create :victor, name: 'A flat TV', slug: 'aflattv'
      @victor8 = create :victor, name: 'Slow Laptop', slug: 'slowlaptop'
      @victor9 = create :victor, name: 'A big TV', slug: 'abigtv'
      Victor.__elasticsearch__.client.indices.refresh
    end
    context 'when name parameter is sent' do
      before(:each) do
        @params = { name: 'laptop' }
        get :index, params: @params
      end
      it 'returns 3 records from the database' do
        victors_response = json_response
        expect(victors_response[:victors].count).to eq(3)
      end
    end
  end
end
