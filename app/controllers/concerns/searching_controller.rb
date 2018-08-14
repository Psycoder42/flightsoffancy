module SearchingController
  extend ActiveSupport::Concern

  # Perform a standard table search
  def search
    result = getSelfClassModel().search(params)
    if result
      # The search gave us something so we can return it
      render json: result
    else
      # Something went wrong, return a 500 error with no body
      render status: 500, json: nil
    end
  end

  # Retrieve the searchable fields for this table
  def fields
    render json: getSelfClassModel().getFieldInfo()
  end

  private

  # Get the class for the Model this controller is handling
  def getSelfClassModel
    modelNamePlural = self.class.name.match(/^(\w+)Controller/)[1]
    return modelNamePlural.singularize.constantize
  end

end
