import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Smart() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-48">Primary UPC</TableHead>
            <TableHead>SKU Owner</TableHead>
            <TableHead>Model Number</TableHead>
            <TableHead>RMS Long Description</TableHead>
            <TableHead>For Individual Sale</TableHead>
            <TableHead>SKU Required in Advance</TableHead>
            <TableHead>FTP Video Location</TableHead>
            <TableHead>Onproof.ca FTP File Location</TableHead>
            <TableHead>Vendor Asset Site URL</TableHead>
            <TableHead>Vendor Asset Site Username & Password</TableHead>
            <TableHead>ETA for Assets</TableHead>
            <TableHead>Product Variants</TableHead>
            <TableHead>Product Overview</TableHead>
            <TableHead>Features and Benefits</TableHead>
            <TableHead>Is In-Store Only BB</TableHead>
            <TableHead>Embargo Date</TableHead>
            <TableHead>Product Condition</TableHead>
            <TableHead>Type (CA-English)</TableHead>
            <TableHead>Material (CA-English)</TableHead>
            <TableHead>Colour (CA-English)</TableHead>
            <TableHead>Pattern/Theme (CA-English)</TableHead>
            <TableHead>Collection/Series (CA-English)</TableHead>
            <TableHead>Compatible Brands (CA-English)</TableHead>
            <TableHead>Compatible Models (CA-English)</TableHead>
            <TableHead>Voice Assistant Built-In</TableHead>
            <TableHead>Works with Google Assistant</TableHead>
            <TableHead>Works with Amazon Alexa</TableHead>
            <TableHead>Product Line (CA-English)</TableHead>
            <TableHead>Jewelry Accessory Type</TableHead>
            <TableHead>Width</TableHead>
            <TableHead>Height</TableHead>
            <TableHead>Depth</TableHead>
            <TableHead>Width (Inches)</TableHead>
            <TableHead>Height (Inches)</TableHead>
            <TableHead>Depth (Inches)</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>What's in the Box (CA-English)</TableHead>
            <TableHead>Flyer Software Platform</TableHead>
            <TableHead>Flyer Subhead (CA-English)</TableHead>
            <TableHead>Flyer Icon 1</TableHead>
            <TableHead>Flyer Bullet 1 (CA-English)</TableHead>
            <TableHead>Flyer Bullet 2 (CA-English)</TableHead>
            <TableHead>Flyer Bullet 3 (CA-English)</TableHead>
            <TableHead>Flyer Bullet 4 (CA-English)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell><Input></Input></TableCell>
            <TableCell><Input></Input></TableCell>
            <TableCell><Input></Input></TableCell>
            <TableCell><Input></Input></TableCell>
            <TableCell><Input></Input></TableCell>
            <TableCell><Input></Input></TableCell>
            <TableCell><Input></Input></TableCell>
            <TableCell><Input></Input></TableCell>
            <TableCell><Input></Input></TableCell>
            <TableCell><Input></Input></TableCell>
            <TableCell><Input></Input></TableCell>
            <TableCell><Input></Input></TableCell>
            <TableCell><Input></Input></TableCell>
            <TableCell><Input></Input></TableCell>
            <TableCell><Input></Input></TableCell>

          </TableRow>
        </TableBody>
      </Table>  
    </main>
  );
}
