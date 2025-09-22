class AffiliateProductsController < ApplicationController
  before_action :authenticate_user!, only: [ :new, :create ]

  def index
    @affiliate_products = AffiliateProduct.all
  end

  def new
    @affiliate_product = AffiliateProduct.new
  end

  def create
    @affiliate_product = AffiliateProduct.new(affiliate_product_params)

    if @affiliate_product.save
      # Successful product
      flash[:success] = "Prodotto creato con successo!"
      redirect_to new_affiliate_product_path
    else
      # Failed validation
      flash.now[:error] = "Ops.. C'è stato un errore. Riprova!"
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @affiliate_product = AffiliateProduct.find(params[:id])
    @affiliate_product.destroy
    redirect_to affiliate_products_path, notice: "Prodotto eliminato"
  end

  private

  def affiliate_product_params
    params.expect(affiliate_product: [ :title, :affiliate_url, :image_url ])
  end
end
