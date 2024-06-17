
import { BarChart, Spline } from "@/client/Charts";
import Link from 'next/link'
import { useTranslations } from 'next-intl';

export default function Home({ params: { lang } }: LangProps) {
	const t = useTranslations('IndexPage');
	
	return (
		<main>
			<BarChart />
			<Spline />
			<Link href={`/${lang}/second-page`}>
				LOGIN
			</Link>
			<div>
				<h1 className='text-4xl mb-4 font-semibold'>{t('title')}</h1>
				<p>{t('description')}</p>
			</div>
		</main>
	);
}
