import React, { useState } from 'react'
import ImageModal from './modals/imageModal/ImageModal'

export default function ImageElement(props) {
	const [isImageModalOpen, setIsImageModalOpen] = useState(false)

	const openImageModal = () => {
		setIsImageModalOpen(true)
	}

	const closeImageModal = () => {
		setIsImageModalOpen(false)
	}

	return (
		<>
			<img src={props.source} className="rounded" alt={props.errorTxt} onClick={openImageModal} />
			<ImageModal isOpen={isImageModalOpen} onModalClose={closeImageModal} source={props.source} />
		</>
	)
}
