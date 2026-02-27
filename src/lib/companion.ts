interface ConditionContext {
	planet: Planet;
}

interface Planet {
	is(id: number): boolean;
	hasEffectID(id: number): boolean;
	get isDefensive(): boolean;
	get isOurs(): boolean;
}

export interface TagState {
	condition: (ctx: ConditionContext) => boolean;
	override: () => Partial<Tag>;
}

export interface Tag {
	slug: string;
	tagType: TagType;
	niche?: string;
	title?: string;
	textTag?: string;
	icBuild?: string;
	theme?: any /* TODO: TYPE! */;
	modes?: string[];
	weight?: number;
	priority?: number;
	timestamp?: [number, number, number][];
	assignCondition?: (ctx: ConditionContext) => boolean;
	states?: TagState[];
}

export enum TagType {
	Hidden,
	Objective,
	Strategic,
	OpParameter,
	EnvCondition,
	PointOfInterest,
}
