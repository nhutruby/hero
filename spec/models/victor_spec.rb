# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Victor, type: :model do
  before { @victor = build(:victor) }
  subject { @victor }
  it { should respond_to(:name) }
  it { should respond_to(:slug) }
  it { should respond_to(:image_portrait) }
  it { should respond_to(:image_splash) }
  it { should respond_to(:updated_at) }
  it { should respond_to(:image_card_background) }
  it { should be_valid }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:slug) }
  it { should validate_presence_of(:image_portrait) }
  it { should validate_presence_of(:updated_at) }
end
RSpec.describe Victor, type: :model do
  describe '.filter' do
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
    context 'when a \'TV\' title pattern is sent' do
      it 'returns the 4 victors matching' do
        @params = {}
        @params[:page] = 1
        @params[:per_page] = 5
        @params[:name] = 'TV'
        expect(Victor.filter(@params).count).to eq(4)
      end
    end
  end
end
