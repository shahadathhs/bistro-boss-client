/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";
import useAuth from './../hooks/useAuth';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './../hooks/useAxiosSecure';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend } from 'recharts';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const AdminHome = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const {data: adminStats = {}} = useQuery({
    queryKey:['admin-stats'],
    queryFn: async() => {
      const res = await axiosSecure.get('/admin-stats')
      return res.data
    }
  })

  const {data: orderStats = []} = useQuery({
    queryKey:['order-stats'],
    queryFn: async() => {
      const res = await axiosSecure.get('/order-stats')
      return res.data
    }
  })

  console.log(adminStats, orderStats)
  // bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };
  
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const picChartData = orderStats.map(order => {
      return {name: order.category, value: order.quantity }
    } 
  )
  

  return (
    <div>
      <Helmet>
        <title>Admin Home | Bistro Boss</title>
      </Helmet>
      <div className="m-2 p-2 border-2 min-h-screen justify-center">
        <h2 className="text-3xl">Hey welcome back! 
          <span className="text-red-600">
            {user?.displayName ? 
            user?.displayName : 
            'to Bistro Boss'}
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-5 gap-3">
          <div className="w-28 bg-blue-300 mx-auto text-center p-4 rounded-md hover:shadow-lg">
              <p>Customers:</p>
              <p>{adminStats.users}</p>
          </div>
          <div className="w-28 bg-blue-300 mx-auto text-center p-4 rounded-md hover:shadow-lg">
              <p>Menu:</p>
              <p>{adminStats.menuItems}</p>
          </div>
          <div className="w-28 bg-blue-300 mx-auto text-center p-4 rounded-md hover:shadow-lg">
              <p>Orders:</p>
              <p>{adminStats.orders}</p>
          </div>
          <div className="w-28 bg-blue-300 mx-auto text-center p-4 rounded-md hover:shadow-lg">
              <p>Revenue:</p>
              <p>{adminStats.revenue}</p>
          </div>
        </div>
        {/* bar chart */}
        <div>
          <BarChart
            width={500}
            height={300}
            data={orderStats}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis dataKey="quantity" />
            <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
              {orderStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        {/* pie chart */}
        <div>
          <PieChart width={400} height={400}>
            <Pie
              data={picChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {picChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;