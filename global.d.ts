interface NextPageProps<SlugType = string> {
	params: Record<string, SlugType>;
	searchParams?: { [key: string]: string | string[] | undefined };
}
