export default function buildProductData(product) {
	const productData = new FormData()

	productData.set('name', product.name)
	productData.set('description', product.description)
	productData.set('category', product.category)
	productData.set('type', product.type)
	productData.set('width', product.width)
	productData.set('height', product.height)
	productData.set('depth', product.depth)
	productData.set('price[pln]', product.price.pln)
	productData.set('price[eur]', product.price.eur)
	productData.set('price[usd]', product.price.usd)
	productData.set('image', product.image)

	return productData
}
