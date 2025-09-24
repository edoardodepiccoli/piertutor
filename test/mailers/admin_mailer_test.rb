require "test_helper"

class AdminMailerTest < ActionMailer::TestCase
  test "form_submission_email" do
    mail = AdminMailer.form_submission_email
    assert_equal "Form submission email", mail.subject
    assert_equal [ "to@example.org" ], mail.to
    assert_equal [ "from@example.com" ], mail.from
    assert_match "Hi", mail.body.encoded
  end
end
