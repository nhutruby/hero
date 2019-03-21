# frozen_string_literal: true

FactoryBot.define do
  factory :victor do
    name { Faker::Name.name }
    slug { Faker::Internet.slug }
    image_portrait { 'https://oversumo-stage.s3-eu-west-1.com/uploads/hero/image_poportrait.png' }
    image_splash { 'https://oversumo-stage.s3-eu-west-1.com/uploads/hero/image_splassplash.jpg' }
    updated_at { '2019-03-20 18:01:45' }
    image_card_background { 'https://oversumo-stage.s3-eu-west-1.comimage_card_background.jpg' }
  end
end
