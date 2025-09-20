class SubmissionsController < ApplicationController
  def new
    @submission = Submission.new
  end

def create
    @submission = Submission.new(submission_params)

    if @submission.save
      # Successful submission
      flash[:success] = "Grazie, il tuo messaggio è stato ricevuto. Ti contatterò al più presto!"
      redirect_to "/"
    else
      # Failed validation
      flash.now[:error] = "Ops.. C'è stato un errore. Riprova!"
      render :new, status: :unprocessable_entity
    end
  end

  private

  def submission_params
    params.expect(submission: [ :full_name, :email, :message ])
  end
end
