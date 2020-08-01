// import { feature } from 'https://unpkg.com/visionscarto-world-atlas@0.0.6/world/50m.json';
// import { csv, json, range } from 'https://unpkg.com/d3@5.7.0/dist/d3.min.js';

export const loadAndProcessData = () =>
    Promise
        .all([
            // tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
            d3.csv('https://gist.githubusercontent.com/nkohdatavis/268451b90e82c0b5432107dd80825aa8/raw/un-population-estimates-medium.csv'),
            d3.json('https://unpkg.com/visionscarto-world-atlas@0.0.6/world/50m.json')
        ])
        .then(([unData, topoJSONdata]) => {
            // console.log(unData);

            const minYear = 2020;
            const maxYear = 2100;

            const years = d3.range(minYear, maxYear + 1);
            // console.log(years);

            const data = [];

            unData.forEach(d => {
                years.forEach(year => {
                    const country = d['Region, subregion, country or area *'];
                    const population = +d[year].replace(/ /g, '') * 1000;
                    const row = {
                        year: new Date(year + ' '),
                        country,
                        population
                    };
                    // console.log(row);
                    data.push(row);
                });
            });

            // console.log(data);

            return data;
            // const rowById = unData.reduce((accumulator, d) => {
            //     accumulator[d['Country code']] = d;
            //     return accumulator;
            // }, {});

            // const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);

            // countries.features.forEach(d => {
            //     Object.assign(d.properties, rowById[+d.id]);
            // });

            // const featuresWithPopulation = countries.features
            //     .filter(d => d.properties['2020'])
            //     .map(d => {
            //         d.properties['2020'] = +d.properties['2020'].replace(/ /g, '') * 1000;
            //         return d;
            //     });

            // return {
            //     features: countries.features,
            //     featuresWithPopulation
            // };
        });