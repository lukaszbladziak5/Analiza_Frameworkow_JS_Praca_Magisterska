import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import buildData from '../../dummyData';

@Component({
  selector: 'app-rendering',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {
  numberOfRows: number = 0;
  data: { id: number, label: string }[] = [];
  add: number =  0;
  create: number =  0;
  databaseLink = 'https://analiza-frameworkow-js-default-rtdb.firebaseio.com/data';

  constructor(private http: HttpClient) {}

  onUpdateOneThousandRows($event: number) {
    console.log('onUpdate', $event);
    this.numberOfRows = $event;

    const startTime = performance.now();
    this.http.get<{ [key: string]: any }>(this.databaseLink + '/api/oneThousandRowsCollections.json')
    .subscribe(response => {
      if (response && typeof response === 'object') {
        const keys = Object.keys(response);

        keys.forEach(key => {
          const newData = buildData(this.numberOfRows);
          this.http.put(`${this.databaseLink}/api/oneThousandRowsCollections/${key}.json`, newData)
          .subscribe(updateResponse => {
              const endTime = performance.now();
              console.log(`Data updated in Firebase for key ${key}`, updateResponse);
              console.log(`Time taken: ${endTime - startTime} ms`);
          });
        });
      }
    });
  }

  onUpdateTenThousandsRows($event: number) {
    console.log('onUpdate', $event);
    this.numberOfRows = $event;

    const startTime = performance.now();
    this.http.get<{ [key: string]: any }>(this.databaseLink + '/api/tenThousandsRowsCollections.json')
    .subscribe(response => {
      if (response && typeof response === 'object') {
        const keys = Object.keys(response);

        keys.forEach(key => {
          const newData = buildData(this.numberOfRows);
          this.http.put(`${this.databaseLink}/api/tenThousandRowsCollections/${key}.json`, newData)
          .subscribe(updateResponse => {
              const endTime = performance.now();
              console.log(`Data updated in Firebase for key ${key}`, updateResponse);
              console.log(`Time taken: ${endTime - startTime} ms`);
          });
        });
      }
    });
  }

  onCreateOneThousandRows($event: number) {
    console.log('onCreate', $event);
    this.numberOfRows = $event;
    const newData = buildData(this.numberOfRows);
  
    const startTime = performance.now();
    this.http.post(`${this.databaseLink}/api/oneThousandRowsCollections.json`, newData).subscribe(response => {
        const endTime = performance.now();
        console.log('Data added to Firebase', response);
        console.log(`Time taken: ${endTime - startTime} ms`);
    });
  }
  
  onCreateTenThousandsRows($event: number) {
    console.log('onCreate', $event);
    this.numberOfRows = $event;
    const newData = buildData(this.numberOfRows);
  
    const startTime = performance.now();
    this.http.get(this.databaseLink + '/api/tenThousandsRowsCollections.json').subscribe(response => {
      let nextId = 1; // Domyślny identyfikator, jeśli baza danych jest pusta
  
      if (response && typeof response === 'object') {
        const dataArray = Object.keys(response);
        if (dataArray.length > 0) {
          const lastId = Math.max(...dataArray.map(id => parseInt(id, 10)));
          nextId = lastId + 1;
        }
      }
  
      this.http.post(`${this.databaseLink}/api/tenThousandsRowsCollections/${nextId}.json`, newData).subscribe(response => {
        const endTime = performance.now();
        console.log('Data added to Firebase', response);
        console.log(`Time taken: ${endTime - startTime} ms`);
      });
    });
  }

  onGetOneThousandRows() {
    this.data = []; // Resetuj dane przed pobraniem nowych

    const startTime = performance.now();
    this.http.get<{ [key: string]: any }>(this.databaseLink + '/api/oneThousandRowsCollections.json').subscribe(response => {
        if (response && typeof response === 'object') {
            const keys = Object.keys(response);

            keys.forEach(key => {
                this.http.get(this.databaseLink + `/api/oneThousandRowsCollections/${key}.json`).subscribe(dataResponse => {
                    if (dataResponse && typeof dataResponse === 'object') {
                        const dataArray = Object.values(dataResponse);
                        const newData = dataArray.map((item, index) => ({
                            id: item.id !== undefined ? item.id : index,
                            label: item.label !== undefined ? item.label : `Label ${index}`
                        }));
                        this.data = [...this.data, ...newData];
                    }
                    const endTime = performance.now();
                    console.log('Data fetched from Firebase', this.data);
                    console.log(`Time taken: ${endTime - startTime} ms`);
                });
            });
        }
    });
  }

  onGetTenThousandsRows() {
    this.data = []; // Resetuj dane przed pobraniem nowych

    const startTime = performance.now();
    this.http.get<{ [key: string]: any }>(this.databaseLink + '/api/tenThousandsRowsCollections.json').subscribe(response => {
        if (response && typeof response === 'object') {
            const keys = Object.keys(response);

            keys.forEach(key => {
                this.http.get(this.databaseLink + `/api/tenThousandsRowsCollections/${key}.json`).subscribe(dataResponse => {
                    if (dataResponse && typeof dataResponse === 'object') {
                        const dataArray = Object.values(dataResponse);
                        const newData = dataArray.map((item, index) => ({
                            id: item.id !== undefined ? item.id : index,
                            label: item.label !== undefined ? item.label : `Label ${index}`
                        }));
                        this.data = [...this.data, ...newData];
                    }
                    const endTime = performance.now();
                    console.log('Data fetched from Firebase', this.data);
                    console.log(`Time taken: ${endTime - startTime} ms`);
                });
            });
        }
    });
  }

  onRemove(){
    this.numberOfRows = 0;
    this.data = [];
  }

  clearDatabase() {
    const startTime = performance.now();
    this.http.delete(this.databaseLink + '.json').subscribe(response => {
      const endTime = performance.now();
      console.log('Database cleared', response);
      console.log(`Time taken: ${endTime - startTime} ms`);
    });
  }
}