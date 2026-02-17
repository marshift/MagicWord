interface Planet {
	is(id: number): boolean;
}

export interface Tag {
	slug: string;
	tagType: TagType;
	niche?: string;
	title?: string;
	textTag?: string;
	icBuild?: string;
	theme?: any; /* TODO: TYPE! */
	modes?: string[];
	weight?: number;
	priority?: number;
	timestamp?: [number, number, number][];
	assignCondition?: ({ planet }: { planet: Planet }) => boolean;
}

export enum TagType {
	Hidden,
	Objective,
	Strategic,
	OpParameter,
	EnvCondition,
	PointOfInterest,
}
