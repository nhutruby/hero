# frozen_string_literal: true

Elasticsearch::Model.client = Elasticsearch::Client.new url: 'http://paas:3d6cda50d5642cc3aab830d409b6c0f8@thorin-us-east-1.searchly.com' || 'http://localhost:9200/'

Kaminari::Hooks.init if defined?(Kaminari::Hooks)
Elasticsearch::Model::Response::
        Response.__send__ :include, Elasticsearch::Model::Response::Pagination::Kaminari

Victor.__elasticsearch__.create_index! force: true
Victor.import force: true
