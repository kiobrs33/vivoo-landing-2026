import { Smartphone, Building2, Wallet } from "lucide-react";

type PaymentMethod = {
  title: string;
  description: string;
  icon: React.ReactNode;
  steps: string[];
  color: string;
  gradient: string;
};

const paymentMethods: PaymentMethod[] = [
  {
    title: "Paga por Yape",
    description:
      "Realiza tu pago fácil y rápido con Yape. Ingresa al aplicativo desde tu celular.",
    icon: <Smartphone size={28} />,
    color: "#FF6B00",
    gradient: "linear-gradient(135deg, #002A64, #0b478f)",
    steps: [
      "Ir a Yape Servicios.",
      "Buscar: VIVOO.",
      "Ingresar DNI/CE/RUC.",
      "Pagar.",
    ],
  },
  {
    title: "BCP Banca Móvil",
    description:
      "Realiza tu pago fácil y rápido con Banca Móvil BCP. ¡Fácil y sin complicaciones!",
    icon: <Wallet size={28} />,
    color: "#FF6B00",
    gradient: "linear-gradient(135deg, #002A64, #0b478f)",
    steps: [
      "Ir a Pagar Servicios.",
      "Buscar: VIVOO.",
      "Ingresar DNI/CE/RUC.",
      "Pagar.",
    ],
  },
  {
    title: "Depósito en Agentes BCP",
    description:
      "Acércate a un agente o ventanilla BCP y realiza tu depósito. ¡Fácil, rápido y sin complicaciones!",
    icon: <Building2 size={28} />,
    color: "#FF6B00",
    gradient: "linear-gradient(135deg, #002A64, #0b478f)",
    steps: [
      "Ir al agente o ventanilla BCP.",
      "Indicar que deseas pagar a: VIVOO.",
      "Brindar tu DNI/CE/RUC.",
      "Realizar el pago.",
    ],
  },
];

export default function Payment() {
  return (
  <section className="bg-[#f5f7fc]">
    <div className="relative pt-32 pb-24 px-6 text-center overflow-hidden rounded-b-[2rem]">

      {/* Base */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#1a3dff_0%,#3b2fd8_45%,#5c1fb8_100%)]" />

      {/* Top-left blue glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#5b82ff59,transparent_45%)]" />


        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#a8e6dd' }}>
            Medios de pago
          </p>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3">
            ¿Cómo realizar tu pago?
          </h1>

          <p className="mt-4 text-base text-white/65">
            Elige la opción que prefieras y sigue los pasos para realizar el
            pago de tu servicio Vivoo.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-20">
        {/* Payment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 -mt-2">
          {paymentMethods.map((method) => {
            const isOpen = true;

            return (
              <div
                key={method.title}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#FF6B00] shadow-xl"
                    : "border-[#002A64]/20 shadow-sm hover:shadow-lg"
                }`}
                style={{ background: "white" }}
              >
                {/* Card Content */}
                <div className="p-7">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `${method.color}18`,
                      color: method.color,
                    }}
                  >
                    {method.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mt-6 text-[#002A64]">
                    {method.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {method.description}
                  </p>
                </div>

                {/* Steps */}
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-200 bg-slate-50 p-7">
                      <h4 className="font-bold text-[#002A64] mb-5">
                        Pasos para realizar tu pago
                      </h4>

                      <ol className="space-y-4">
                        {method.steps.map((step, stepIndex) => (
                          <li
                            key={step}
                            className="flex items-start gap-3 text-slate-700"
                          >
                            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#FF6B00] text-white text-sm font-bold flex items-center justify-center">
                              {stepIndex + 1}
                            </span>

                            <span className="pt-1">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}