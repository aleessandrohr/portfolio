import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/icon";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { menuItems } from "@/constants/menu-items";
import { socialMedia } from "@/constants/social-media";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

const socialMediaArray = Object.values(socialMedia);

export const Profile = () => (
	<Card className="flex h-full max-h-full w-full max-w-md flex-col justify-between gap-2 overflow-y-auto md:rounded-none">
		<div>
			<CardHeader>
				<CardTitle className="flex flex-col gap-2 text-center">
					<picture className="my-4 flex h-full w-full items-center justify-center">
						<Image
							src="/static/assets/profile.jpg"
							alt="Profile"
							width={480}
							height={480}
							className="h-40 w-40 rounded-full object-cover"
						/>
					</picture>
					<span className="font-bold text-2xl">Alessandro Henrique Ramos</span>
					<span className="text-xl">Desenvolvedor FullStack Pleno</span>
				</CardTitle>
				<CardDescription className="custom_description">
					Olá! Meu nome é Alessandro Henrique Ramos e sou Desenvolvedor
					FullStack Pleno com experiência em TypeScript, React e Node.js.
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{menuItems.map(({ href, value }) => (
					<Button asChild key={value}>
						<Link href={href}>{value}</Link>
					</Button>
				))}
			</CardContent>
		</div>
		<CardFooter className="flex flex-wrap justify-between gap-2">
			<div className="flex gap-2">
				{socialMediaArray.map(({ href, name, icon }) => (
					<TooltipProvider key={name}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button asChild variant="outline" size="icon">
									<Link href={href} aria-label={name} target="_blank">
										<Icon name={icon} />
									</Link>
								</Button>
							</TooltipTrigger>
							<TooltipContent>{name}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
			</div>
			<ModeToggle />
		</CardFooter>
	</Card>
);
