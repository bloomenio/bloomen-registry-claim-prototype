import { Injectable } from '@nestjs/common';
import { Registry } from '../registry/interfaces/registry.interface';

@Injectable()
export class SearchService {

    private readonly registries: Registry[] = [];

    search(q: string, limit: number, offset: number): Registry[] {
        let x: Registry[] = [];
        let off: number = 0;
        for (let i = 0; i < this.registries.length; ++i) {
            if (x.length == limit)
                return x;
            else {
                if (this.registries[i].name.search(q)) {
                    ++off;
                    if (off >= offset) x.push(this.registries[i]);
                }
                else if (this.registries[i].author.search(q)) {
                    ++off;
                    if (off >= offset) x.push(this.registries[i]);
                }
                else if (this.registries[i].description.search(q)) {
                    ++off;
                    if (off >= offset) x.push(this.registries[i]);
                }
            }
        }
        return x;
    }

}   
