# frozen_string_literal: true

module Api
  module V1
    # Victor Controller
    class VictorsController < ApplicationController
      def index
        victors = Victor.filter(victor_params)

        render json: { victors: victors, meta: { pagination:
                                          { per_page: params[:per_page],
					    name: params[:name],
                                            total_pages: victors.total_pages,
                                            total_objects: victors.total_count } } }
      end

      protected

      def pagination(paginated_array, per_page)
        { pagination: { per_page: per_page || 5,
                        total_pages: paginated_array.total_pages,
                        total_objects: paginated_array.total_count } }
      end

      private

      def victor_params
        params[:page] = params[:page] || 1
        params[:per_page] = params[:per_page] || 5
        params.permit(:name, :page, :per_page)
      end
    end
  end
end
