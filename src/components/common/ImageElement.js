import React, { useState } from 'react'
import ImageModal from './modals/imageModal/ImageModal'

export default function ImageElement(props) {
	const [isImageModalOpen, setIsImageModalOpen] = useState(false)

	return (
		<>
			<img
				src={props.source}
				className="rounded"
				alt={props.errorTxt}
				onClick={() => setIsImageModalOpen(true)}
			/>
			<ImageModal
				isOpen={isImageModalOpen}
				onModalClose={() => setIsImageModalOpen(false)}
				source={props.source}
			/>
		</>
	)
}
