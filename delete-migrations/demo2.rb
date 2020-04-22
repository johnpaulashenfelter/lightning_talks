class RemoveDisabilityCompensationJobStatuses < ActiveRecord::Migration[5.2]
  def change
    drop_table :disability_compensation_job_statuses
  end
end















$ rake db:migrate
== 20200317162403 RemoveDisabilityCompensationJobStatuses: migrating ==========
-- drop_table(:disability_compensation_job_statuses)
   -> 0.0026s
== 20200317162403 RemoveDisabilityCompensationJobStatuses: migrated (0.0061s) =

$ rake db:rollback
/Users/johnpaul/work/oddball/vets-api/rakelib/connectivity.rake:11: warning: already initialized constant REDIS_CONFIG
/Users/johnpaul/work/oddball/vets-api/config/initializers/redis.rb:4: warning: previous definition of REDIS_CONFIG was here
== 20200317164309 RemoveDisabilityCompensationSubmissions: reverting ==========
rake aborted!
StandardError: An error has occurred, this and all later migrations canceled

