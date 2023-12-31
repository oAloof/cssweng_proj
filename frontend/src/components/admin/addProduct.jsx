import { AnimatePresence, motion } from "framer-motion";
import { useState, useContext } from "react";
import InputField from "./InputField.jsx";
import {
  productName_validation,
  availableQuantity_validation,
  discountPercentage_validation,
  productOriginalPrice_validation,
  desc_validation,
} from "../../utils/inputValidations.jsx";
import { useForm, FormProvider, Controller } from "react-hook-form";
import MultiSelect from "./multiSelect.jsx";

// CONTEXTS
import { ProductsContext } from "../../contexts/ProductsContext.jsx";
import ErrorMessage from "../ErrorMessage.jsx";

const AddProduct = ({ title, setErrorMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [fileObjects, setFileObjects] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const mappedImages = filesArray.map((file) => URL.createObjectURL(file));
      setFileObjects((prevFiles) => [...prevFiles, ...filesArray]);
      setImages((prevImages) => [...prevImages, ...mappedImages]);
    }
  };

  return (
    <div className="place-content-center">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
      >
        {title}
      </button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        images={images}
        setImages={setImages}
        fileObjects={fileObjects}
        setFileObjects={setFileObjects}
        handleImageChange={handleImageChange}
        title={title}
      />
    </div>
  );
};

const Modal = ({
  isOpen,
  setIsOpen,
  images,
  setImages,
  fileObjects,
  setFileObjects,
  handleImageChange,
  title,
}) => {
  const methods = useForm({ mode: "onSubmit" });
  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;
  const originalPrice = watch("originalPrice", 0);
  const discountPercentage = watch("discountPercentage", 0);
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;
  const formattedSalePrice = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(discountedPrice);

  const { setProductChanged, setIsLoading } = useContext(ProductsContext);

  const onSubmit = (data) => {
    addProduct(data);
  };

  const addProduct = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    formData.append(
      "discountedPrice",
      parseFloat(discountedPrice.toFixed(2)).toString()
    );

    fileObjects.forEach((file) => formData.append("images", file));

    try {
      setIsLoading(true);
      setIsOpen(false); // close modal
      const response = await fetch(
        "http://localhost:4000/api/admin/products/addProduct",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const responseData = await response.json();
      setIsOpen(false); // close modal
      setImages([]); // reset images
      setFileObjects([]); // reset file objects
      methods.reset(); // reset form
      setProductChanged(true); // trigger useEffect in ProductsContext to fetch products again
      console.log(responseData);
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const categoryOptions = [
    { value: "appliances", label: "Appliances" },
    { value: "aircons", label: "Aircons" },
    { value: "sound systems", label: "Sound Systems" },
    { value: "refrigerators", label: "Refrigerators" },
  ];

  const brandOptions = [
    { value: "hitachi", label: "Hitachi" },
    { value: "samsung", label: "Samsung" },
    { value: "sennheiser", label: "Sennheiser" },
    { value: "union", label: "Union" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-10 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-visible"
          >
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-left mb-2">{title}</h3>
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  noValidate
                  className="flex flex-col gap-4"
                >
                  <InputField
                    {...productName_validation}
                    {...methods.register(productName_validation.name)}
                  />
                  <div className="flex flex-row justify-between gap-4 items-start">
                    <div className="flex flex-col gap-1 items-end w-1/2">
                      <InputField
                        {...productOriginalPrice_validation}
                        {...methods.register(
                          productOriginalPrice_validation.name
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-1 items-end w-1/2">
                      <InputField
                        {...discountPercentage_validation}
                        {...methods.register(
                          discountPercentage_validation.name
                        )}
                      />
                      <p className="font-Nunito font-medium mb-0">
                        Sale Price: ₱{formattedSalePrice}
                      </p>
                    </div>
                  </div>
                  <InputField
                    {...availableQuantity_validation}
                    {...methods.register(availableQuantity_validation.name)}
                  />
                  <InputField
                    {...desc_validation}
                    {...methods.register(desc_validation.name)}
                    multiline
                  />
                  <Controller
                    name="category"
                    control={methods.control}
                    rules={{ required: "Category is required" }}
                    render={({ field, fieldState }) => (
                      <MultiSelect
                        {...field}
                        selectOptions={categoryOptions}
                        isUserInputAllowed={true}
                        isMulti={true}
                        error={fieldState.error}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    name="brand"
                    control={methods.control}
                    rules={{ required: "Brand is required" }}
                    render={({ field, fieldState }) => (
                      <MultiSelect
                        {...field}
                        selectOptions={brandOptions}
                        isUserInputAllowed={true}
                        isMulti={false}
                        error={fieldState.error}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="images" className="text-lg font-medium">
                        Upload Images ({images.length})
                      </label>
                      <div className="relative">
                        <div className="flex flex-row justify-end">
                          {errors.images && (
                            <ErrorMessage message={errors.images.message} />
                          )}
                        </div>

                        <input
                          type="file"
                          id="images"
                          name="images"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          required
                        />

                        <button className="bg-white hover:bg-indigo-200 text-indigo-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
                          <i className="fas fa-upload"></i>
                          <span>Upload Images</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="listProduct"
                        className="text-lg font-medium"
                      >
                        List Product?
                      </label>
                      <div className="relative flex items-center">
                        <input
                          {...methods.register("listProduct")} // includes checkbox value in form data
                          type="checkbox"
                          id="listProduct"
                          name="listProduct"
                          className="mr-2"
                        />
                        <span className="text-white text-sm">
                          List product for sales
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 overflow-x-auto">
                    {images.map((image, index) => (
                      <div key={image} className="relative">
                        <img
                          src={image}
                          alt="uploaded photo"
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => {
                            const newImages = [...images];
                            newImages.splice(index, 1);
                            setImages(newImages);
                            const newFileObjects = [...fileObjects];
                            newFileObjects.splice(index, 1);
                            setFileObjects(newFileObjects);
                          }}
                          className="absolute top-0 right-0 text-white rounded-full w-6 h-6 flex items-center justify-center bg-rose-500"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                    >
                      Close
                    </button>
                    <button
                      className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddProduct;
