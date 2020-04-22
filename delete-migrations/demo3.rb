class RemoveDisabilityCompensationJobStatuses < ActiveRecord::Migration[5.2]
  def change
    drop_table :disability_compensation_job_statuses, id: :serial, force: :cascade  do |t|
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.integer "disability_compensation_id"
      t.integer "va526ez_submit_transaction_id"
      t.boolean "complete", default: false
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
