class AddHighlightedToAffiliateProducts < ActiveRecord::Migration[8.0]
  def change
    add_column :affiliate_products, :highlighted, :boolean, default: false, null: false
  end
end
