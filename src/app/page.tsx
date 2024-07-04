
import { BarChart, Spline } from "@/client/Charts";
import ChangeLang from "@/components/layouts/ChangeLang";
import Text from "@/components/login/Text";

async function getData() {
	const response = await fetch('https://jsonplaceholder.typicode.com/todos/5');
	console.log("get data from server")

	const data = await response.json()

	return data
}

export default async function Home() {

	const data = await getData()
	console.log(data)

	return (
		<main>
			<div>
				<h1 className='text-4xl mb-4 font-semibold'></h1>
				<Text />
				<ChangeLang />
			</div>
			<p>{data?.title}</p>
			<BarChart />
			<Spline />

			
		</main>
	);
}
