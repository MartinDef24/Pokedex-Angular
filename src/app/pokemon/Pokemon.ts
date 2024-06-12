export class Pokemon {
    id:number;
    name:string;
    hp:number;
    cp:number;
    types:Array<string>;
    created: Date;
    picture: string;

    constructor(
        name:string = 'Entrer un nom',
        hp:number = 100,
        cp:number = 5,
        types:Array<string> = ['Normal'],
        created: Date = new Date(),
        picture: string = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png',

    ) {
        this.hp = hp;
        this.cp = cp;
        this.name = name;
        this.picture = picture;
        this.types = types;
        this.created = created;
    }
}