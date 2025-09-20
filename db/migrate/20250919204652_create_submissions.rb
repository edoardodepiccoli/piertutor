class CreateSubmissions < ActiveRecord::Migration[8.0]
  def change
    create_table :submissions do |t|
      t.timestamps
      t.string :full_name, null: false
      t.string :email, null: false
      t.text :message, null: false
    end
  end
end
