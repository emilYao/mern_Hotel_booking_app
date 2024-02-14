import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImageSection from "./ImageSection";

export type HotelFormData = {
  name: String;
  city: String;
  country: String;
  description: String;
  type: String;
  adultCount: number;
  childCount: number;
  facilities: String[];
  pricePerNight: number;
  imageFiles: FileList;
  startRating: number;
};

type Props = {
  onSave: (HotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    formData.append("name", formDataJson.name.toString());
    formData.append("city", formDataJson.city.toString());
    formData.append("country", formDataJson.country.toString());
    formData.append("description", formDataJson.description.toString());
    formData.append("type", formDataJson.type.toString());
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("starRating", formDataJson.startRating.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility.toString());
    });

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    onSave(formData);
  });
  return (
    <>
      <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestsSection />
          <ImageSection />

          <span className="flex justify-end">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
            >
              {isLoading ? "Saving...": "Save"}
            </button>
          </span>
        </form>
      </FormProvider>
    </>
  );
};

export default ManageHotelForm;
