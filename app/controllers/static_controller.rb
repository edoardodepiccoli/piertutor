class StaticController < ApplicationController
  def index
    @submission = Submission.new
  end
end
