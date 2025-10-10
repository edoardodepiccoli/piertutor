# app/mailers/admin_mailer.rb
class AdminMailer < ApplicationMailer
  default from: "no-reply@mg.piertutor.com" # Change to your domain

  def form_submission_email(submission)
    @submission = submission
    @full_name = submission[:full_name] || submission["full_name"]
    @email = submission[:email] || submission["email"]
    @message = submission[:message] || submission["message"]

    mail(
      to: "pierantonio77@gmail.com",
      subject: "Messaggio dal form di contatto da #{@full_name}"
    )
  end
end
