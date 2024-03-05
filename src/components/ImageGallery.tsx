import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../.././gallery.css";

interface PopupImage {
    id: string;
    imageUrl: string;
}

/**
 * ImageGallery component displays a gallery of selected images.
 *
 * @component
 */
const ImageGallery: React.FC = () => {
    const location = useLocation();
    const selectedImages = location.state?.selectedImageObjects || [];
    console.log("Selected images from gallery", selectedImages);
    const [popupImage, setPopupImage] = useState<PopupImage | null>(null);
    console.log("Popup Image Source:", popupImage);
    const [isImagePopupVisible, setIsImagePopupVisible] =
        useState<boolean>(false);
    const navigate = useNavigate();

    /**
     * Shows the image in a popup.
     *
     * @param {PopupImage} imageSrc - The source of the image to be displayed.
     */
    const showImage = (imageSrc: PopupImage) => {
        console.log("imageSrc", imageSrc);

        setPopupImage(imageSrc);
        setIsImagePopupVisible(true);
        document.body.style.overflow = "hidden";
    };

    /**
     * Closes the image popup.
     */
    const closeImage = () => {
        setIsImagePopupVisible(false);
        document.body.style.overflow = "auto";
    };

    /**
     * Navigates back to the previous page.
     */
    const goBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <div className="heading mt-11 mb-6">
                <h1>Image Gallery</h1>
            </div>
            <div className="gallery items-center">
                {selectedImages && selectedImages.length > 0 ? (
                    selectedImages &&
                    selectedImages.map((image: any) => (
                        <img
                            key={image.id}
                            src={image.imageUrl}
                            className="gallery-img w-[300px] h-[250px] border-r-emerald-950 shadow-2xl"
                            alt={`Selected Image`}
                            onClick={() => showImage(image)}
                        />
                    ))
                ) : (
                    <div className="flex items-center justify-center gallery-placeholder">
                        <p className="text-gray-900 text-2xl">No images selected</p>
                    </div>
                )}
            </div>
            <div
                className={`image-popup-container ${isImagePopupVisible ? "block" : "hidden"
                    }`}
            >
                <span
                    className="close-button"
                    onClick={closeImage}
                >
                    ×
                </span>
                {popupImage && (
                    <img
                        src={popupImage?.imageUrl}
                        alt="Popup Image"
                        id="popupImage"
                    />
                )}
            </div>
            <div className="flex justify-center">
                <button
                    onClick={goBack}
                    className=" my-24 px-5 py-5 mt-9 p-2 bg-gray-400 text-white from-neutral-300 text-2xl 
rounded-full"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default ImageGallery;
