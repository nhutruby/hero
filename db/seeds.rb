# frozen_string_literal: true

require 'net/http'
require 'json'

url = 'https://s3.eu-central-1.amazonaws.com/dojomadness.com/code-challenge/heros'
uri = URI(url)
response = Net::HTTP.get(uri)
objs = JSON.parse(response)
objs.each do |obj|
  obj[1].each do |child|
    attributes = child['attributes']
    hero = Victor.new
    hero.name = attributes['name']
    hero.slug = attributes['slug']
    hero.image_portrait = attributes['image_portrait']
    hero.image_splash = attributes['image_splash']
    hero.updated_at = Time.parse(attributes['updated_at']).getutc
    hero.image_card_background = attributes['image_card_background']
    hero.save
  end
end
