/* eslint-disable no-unused-vars */
import { arrayMoveImmutable } from "array-move";
import { useState } from "react";
import SortableList, { SortableItem } from "react-easy-sort";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const images = [
  {
    id: "image1",
    src: "/images/image-1.webp",
  },
  {
    id: "image2",
    src: "/images/image-2.webp",
  },
  {
    id: "image3",
    src: "/images/image-3.webp",
  },
  {
    id: "image4",
    src: "/images/image-4.webp",
  },
  {
    id: "image5",
    src: "/images/image-5.webp",
  },
  {
    id: "image6",
    src: "/images/image-6.webp",
  },
  {
    id: "image7",
    src: "/images/image-7.webp",
  },
  {
    id: "image8",
    src: "/images/image-8.webp",
  },
  {
    id: "image9",
    src: "/images/image-9.webp",
  },
  {
    id: "image10",
    src: "/images/image-10.jpeg",
  },
  {
    id: "image11",
    src: "/images/image-11.jpeg",
  },
];

export default function ImageGallery() {
  const [gallery, setGallery] = useState(images);
  const [isSelected, setIsSelected] = useState([]);

  // Checking and Selecting which items are selected
  function handleOnChange(e) {
    const { value, checked } = e.target;

    if (checked) {
      setIsSelected((prev) => [...prev, value]);
    } else {
      setIsSelected((prev) => prev.filter((item) => item !== value));
    }
  }

  // Deleting Selected Items and updating the gallery
  function handleDelete() {
    const updatedGalley = gallery.filter((item) => {
      if (!isSelected.includes(item.id)) return item;
    });

    setGallery(updatedGalley);
    setIsSelected([]);
  }

  // Image Upload Functionality
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        const newImage = {
          id: `image${images.length + 1}`,
          src: `/images/${file.name}`,
        };

        // New Image can be pushed here to the gallery array and also use a backend server to store the new Image
        // setGallery((prev) => [...prev, newImage]);

        alert(
          "New Gallery will the updated into Gallery if the previous setGallery function is invoked"
        );
      } else {
        alert(
          "File size exceeds 1MB. Or File type not supported Please choose a different file."
        );
      }
    }
  }

  function handleOnSortEnd(oldIndex, newIndex) {
    setGallery((prev) => arrayMoveImmutable(prev, oldIndex, newIndex));
  }

  return (
    <div className="container">
      <div className="header">
        <h2>
          {isSelected.length > 0
            ? `${isSelected.length} Imgaes Selected`
            : "Gallery"}
        </h2>

        {isSelected.length > 0 ? (
          <button onClick={handleDelete}>Delete Images</button>
        ) : (
          ""
        )}
      </div>

      <SortableList onSortEnd={handleOnSortEnd} className="gallery">
        {gallery.map((image, index) => (
          <SortableItem key={image.id}>
            <div className={`gallery-item gallery-item-${index + 1}`}>
              <input
                type="checkbox"
                name="galleryImages"
                id={image.id}
                value={image.id}
                onChange={handleOnChange}
              />
              <img src={image.src} alt={image.id} />
            </div>
          </SortableItem>
        ))}
        <div className=" add">
          <label className="image-upload">
            <img src="/images/placeholder.png" alt="placeholder image" />
            <p>Add Image</p>
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </SortableList>
    </div>
  );
}
