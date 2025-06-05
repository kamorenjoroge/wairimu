import { FaTruck, FaExchangeAlt, FaShieldAlt } from 'react-icons/fa';

const Moreinfo = () => {
  const policies = [
    {
      icon: <FaTruck className="text-primary text-xl mt-1 mr-3" />,
      title: "Free Shipping",
      description: "On all orders over Kes 2,999"
    },
    {
      icon: <FaExchangeAlt className="text-primary text-xl mt-1 mr-3" />,
      title: "Easy Returns",
      description: "30-day return policy"
    },
    {
      icon: <FaShieldAlt className="text-primary text-xl mt-1 mr-3" />,
      title: "Secure Payment",
      description: "100% secure checkout"
    }
  ];

  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="text-xl font-bold mb-4">Shipping & Policies</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {policies.map((policy, index) => (
          <div key={index} className="flex items-start">
            {policy.icon}
            <div>
              <h3 className="font-semibold">{policy.title}</h3>
              <p className="text-gray-600 text-sm">{policy.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Moreinfo;