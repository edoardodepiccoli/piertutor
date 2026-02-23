class AffiliateProductsController < ApplicationController
  before_action :authenticate_user!, only: [ :new, :create, :destroy, :toggle_highlight ]

  def index
    @highlighted_products = AffiliateProduct.where(highlighted: true).order(created_at: :desc)
    @regular_products = AffiliateProduct.where(highlighted: false).order(created_at: :desc)
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

  def toggle_highlight
    @affiliate_product = AffiliateProduct.find(params[:id])
    @affiliate_product.update(highlighted: !@affiliate_product.highlighted)

    @highlighted_products = AffiliateProduct.where(highlighted: true).order(created_at: :desc)
    @regular_products = AffiliateProduct.where(highlighted: false).order(created_at: :desc)

    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to affiliate_products_path }
    end
  end

  private

  def affiliate_product_params
    params.expect(affiliate_product: [ :title, :affiliate_url, :image_url ])
  end
end
