class CreateAffiliateProducts < ActiveRecord::Migration[8.0]
  def change
    create_table :affiliate_products do |t|
      t.string :title
      t.string :image_url
      t.string :affiliate_url

      t.timestamps
    end
  end
end
