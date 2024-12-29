//console.log("Hello world");

let j=1;
let positionList = [];
let bigFile = null;
let smallFile = null;
let c =7;
let name ="";



class Node{
   constructor(data) {
        this.data = data;
        this.partNo=null;
        this.position =null;
        this.next = null; 
    }
}

class LinkedList {
    constructor() {
        this.head = null;}
    
   append(data,pos=null) {
          let newNode = new Node(data);
       if (!this.head) {
            this.head = newNode;
           var r=this.head.data.split(",");
           this.head.partNo=r[1];
           this.head.position=pos;
           
            return;
        }else{
           let current = this.head;
           while(current.next !=null){
               current=current.next;
           }
           current.next =newNode;
           var r=current.next.data.split(",");
           current.next.partNo=r[1];
           current.next.position=pos;
           
           return;
        }
   }
    
    getData(position,head){
        
        if(position<1){
            return
        }
        if (position==1) {
            return head;
        }
        
        this.getData(position-1,head.next)
        
    }
    
    displayData(head){
        
        if(head == null){
            return;
        }
        console.log(head.data);
        this.displayData(head.next); 
    }
    displayPosition(head){
        
        if(head == null){
            return;
        }
        console.log(head.position);
        this.displayPosition(head.next); 
    }
    displayPartNumber(head){
        if(head == null){
            return;
        }
        console.log(head.partNo);
        this.displayPartNumber(head.next);   
    }
}


function Match(head1, head2) {
    let current1 = head1;
    let current2 = head2;
    let jj = 2;
    //console.log("matching");
    while (current1 != null) {
        current2 = head2;
          //jj=2;
        while (current2 != null) {
            
            if (current1.partNo == current2.partNo) {
                positionList.push(current1.position);
                // console.log(current1.partNo);
                // console.log(current1.position);
                break;
            }
            //jj++;
            current2 = current2.next;
        }
          // j is incremented after the inner loop is done processing the current1 element
        current1 = current1.next;
    }
}



// function Match(head1,head2) {
// ///head1 must be the bigger list
//     let current1=head1;
//     j=1;
//     while (current1 !=null) {
//         var current2=head2;
//         while (current2 !=null) {
//             if (current1.partNo == current2.partNo) {
//                 positionList.push(j);
//                 console.log(j);
//                 break;
//             }
            
//             current2=current2.next;
//         }
//         j++;
//          current1=current1.next;
//     }    
// }

function ReadCSVFile(file) {
 if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const csvContent = e.target.result;
            const rows = csvContent.split('\n');
            for (let row of rows) {
                if(j==1){
                    j++;
                    continue;
                }else{
                    if (row.trim() === "") { continue; }
                    myList2.append(row);
                    j++;
                } 
            }
            j=1;
            //myList2.displayPartNumber(myList2.head);
        };        
        reader.readAsText(file);
    } else {
        alert('No file selected');
    }   
}

function ReadWriteCSVFile(file) {
 if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const csvContent = e.target.result;
            const rows = csvContent.split('\n');
            for (let row of rows) {
                if(j==1){
                    j++;
                    continue;
                }else{
                    if (row.trim() === "") { continue; }
                    myList1.append(row,j);
                    j++;
                } 
            }
            //j=1;
            //myList1.displayPosition(myList1.head);
            
        };  
     
     
        reader.readAsText(file);
    } else {
        alert('No file selected');
    }   
}

///
function downloadCSV(data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'modified_data.csv';
    link.click();
}

function Replace() {
for (let ii = 0; ii < bound; ii++) {

    let s = myList1.getData(positionList[ii],myList1.head).split(",");
    s[c]=name;


}
}



function processCSV(file) {
    
    let l=positionList.length;
    
for (let ii = 0; ii < l; ii++) {
let s = myList1.getData(positionList[ii],myList1.head).split(",");
s[c]=name;

}
    const updatedCSV = myList1.getData(positionList[ii],myList1.head).join('\n');
    downloadCSV(updatedCSV);

    
}





document.getElementById('bigFileInput').addEventListener('change', function(event) {
    file1 = event.target.files[0];
});

document.getElementById('smallFileInput').addEventListener('change', function(event) {
   file2 = event.target.files[0];
   
});
document.getElementById('startProcessingButton').addEventListener('click', function(event) {
    name = document.getElementById("partJobNumber").value;
    ReadWriteCSVFile(file1);
    ReadCSVFile(file2);
    
    setTimeout(() => {
        Match(myList1.head, myList2.head);
        processCSV()
    }, 3000);
   console.log(name);
    
});

const myList1 = new LinkedList();
const myList2 = new LinkedList();

