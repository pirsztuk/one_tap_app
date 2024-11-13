import { useState } from 'react'
import { Apple } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

export default function App() {
	const [price, setPrice] = useState('999')
	const [showConfirmation, setShowConfirmation] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	const handlePayment = () => {
		// Here you would typically integrate with a payment processor
		// For this example, we'll just show a confirmation dialog
		setShowConfirmation(true)
	}

	const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Remove any non-digit characters
		const newPrice = event.target.value.replace(/[^\d]/g, '')
		setPrice(newPrice)
	}

	const formatPrice = (price: string) => {
		const numPrice = parseInt(price, 10)
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(numPrice)
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-white px-4'>
			<div className='text-center w-full max-w-xs'>
				{isEditing ? (
					<Input
						type='text'
						value={price}
						onChange={handlePriceChange}
						onBlur={() => setIsEditing(false)}
						className='text-6xl font-bold mb-8 text-black text-center w-full'
						autoFocus
					/>
				) : (
					<button
						onClick={() => setIsEditing(true)}
						className='text-6xl font-bold mb-8 text-black w-full focus:outline-none'
					>
						{formatPrice(price)}
					</button>
				)}
				<Button
					className='w-full h-16 text-xl bg-black hover:bg-gray-800 text-white'
					onClick={handlePayment}
				>
					<Apple className='mr-2 h-6 w-6' /> Pay
				</Button>
			</div>

			<Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
				<DialogContent className='bg-white'>
					<DialogHeader>
						<DialogTitle className='text-black'>Payment Confirmed</DialogTitle>
						<DialogDescription className='text-gray-600'>
							Your payment of {formatPrice(price)} has been processed
							successfully.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							onClick={() => setShowConfirmation(false)}
							className='bg-black text-white hover:bg-gray-800'
						>
							Close
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
