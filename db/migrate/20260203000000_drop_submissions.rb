class DropSubmissions < ActiveRecord::Migration[8.0]
  def up
    drop_table :submissions
  end

  def down
    create_table :submissions do |t|
      t.string :full_name
      t.string :email
      t.text :message

      t.timestamps
    end
  end
end
