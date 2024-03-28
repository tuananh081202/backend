import React from 'react';

const DescriptionCell = ({ description }) => {
    // Phân tích HTML để trích xuất hình ảnh
    const extractImages = () => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = description;
        const images = tempDiv.getElementsByTagName('img');
        return Array.from(images).map(image => image.src);
    };

    // Hiển thị mô tả với hình ảnh
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
            <div>
                {/* Hiển thị tất cả hình ảnh */}
                {extractImages().map((src, index) => (
                    <img key={index} src={src} alt={`Image ${index}`} />
                ))}
            </div>
        </div>
    );
};

export default DescriptionCell;
