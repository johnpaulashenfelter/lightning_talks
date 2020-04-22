class RemoveDisabilityCompensationJobStatuses < ActiveRecord::Migration[5.2]
  def up
    drop_table :disability_compensation_job_statuses
  end

  def down
    create_table "disability_compensation_job_statuses", id: :serial, force: :cascade do |t|
      t.integer "disability_compensation_submission_id", null: false
      t.string "job_id", null: false
      t.string "job_class", null: false
      t.string "status", null: false
      t.string "error_message"
      t.datetime "updated_at", null: false
      t.index ["disability_compensation_submission_id"], name: "index_disability_compensation_job_statuses_on_dsc_id"
      t.index ["job_id"], name: "index_disability_compensation_job_statuses_on_job_id", unique: true
    end
  end
end




$ rake db:migrate
== 20200317162403 RemoveDisabilityCompensationJobStatuses: migrating ==========
-- drop_table(:disability_compensation_job_statuses)
   -> 0.0026s
== 20200317162403 RemoveDisabilityCompensationJobStatuses: migrated (0.0061s) =

$ rake db:rollback
== 20200317164309 RemoveDisabilityCompensationSubmissions: reverting ==========
-- create_table(:disability_compensation_job_statuses)
   -> 0.0031s
== 20200317164309 RemoveDisabilityCompensationSubmissions: reverted ==========
