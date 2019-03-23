# frozen_string_literal: true

Elasticsearch::Model.client = Elasticsearch::Client.new url: ENV['SEARCHBOX_URL'] || 'http://localhost:9200/'

Kaminari::Hooks.init if defined?(Kaminari::Hooks)
Elasticsearch::Model::Response::
        Response.__send__ :include, Elasticsearch::Model::Response::Pagination::Kaminari

Victor.__elasticsearch__.create_index! force: true
Victor.import force: true
