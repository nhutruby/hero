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
  it { should validate_presence_of(:image_splash) }
  it { should validate_presence_of(:updated_at) }
  it { should validate_presence_of(:image_card_background) }
end
