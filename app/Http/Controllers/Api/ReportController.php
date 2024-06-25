<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDriver;
use DateInterval;
use DatePeriod;
use DateTime;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{

    public function getOrdesYear(Request $request): JsonResponse
    {
        try {
            $year = $request->input('year'); // Obtener el año desde la solicitud

            // Validar que se haya proporcionado un año válido
            if (!$year || !is_numeric($year) || strlen($year) !== 4) {
                return response()->json(['error' => 'Año inválido. Proporcione un año válido de cuatro dígitos.'], 400);
            }

            // Obtener la fecha mínima y máxima de las órdenes para el año especificado
            $minDate = $year . '-01-01';
            $maxDate = $year . '-12-31';

            // Crear un array con los nombres de los meses en inglés
            $months = [
                'Ene' => '01',
                'Feb' => '02',
                'Mar' => '03',
                'Abr' => '04',
                'May' => '05',
                'Jun' => '06',
                'Jul' => '07',
                'Ago' => '08',
                'Sep' => '09',
                'Oct' => '10',
                'Nov' => '11',
                'Dic' => '12',
            ];

            // Crear un array vacío para todos los meses con año
            $allMonths = [];

            // Iterar sobre todos los meses del año especificado
            foreach ($months as $key => $value) {
                $allMonths[] = [
                    'month' => $key,
                    'year' => $year,
                    'total_orders' => 0,
                ];
            }

            // Consulta para obtener el conteo de órdenes por mes
            $orders = DB::table('orders')
                ->selectRaw('EXTRACT(MONTH FROM date) as month, COUNT(id) as total_orders')
                ->whereBetween('date', [$minDate, $maxDate])
                ->groupBy(DB::raw('EXTRACT(MONTH FROM date)'))
                ->get();

            // Actualizar el conteo de órdenes para cada mes encontrado en la consulta
            foreach ($orders as $order) {
                $monthNumber = $order->month;
                $monthName = array_search($monthNumber, $months);
                if ($monthName !== false) {
                    foreach ($allMonths as &$monthData) {
                        if ($monthData['month'] === $monthName) {
                            $monthData['total_orders'] = $order->total_orders;
                            break;
                        }
                    }
                }
            }

            return response()->json(['orders' => $allMonths]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getDrivers(Request $request): JsonResponse
    {
        $s = $request->input('state');
        $date = $request->input('mes');
        switch ($s) {
            case 1:
                $state = 'terminado';
                break;
            case 2:
                $state = 'pendiente';
                break;
            default:
                $state = 'progreso';
                break;
        }


        //$orders = Order::where('state','=',$request->state)->whereMonth('date','=',$request->mes)->with('')->get();
        $orders = OrderDriver::select('driver_id', DB::raw('COUNT(*) as order_count'))
            ->whereHas('order', function ($query) use ($state, $date) {
                $query->where('state', $state)
                    ->whereMonth('date', $date);
            })
            ->with('driver:id,name')
            ->groupBy('driver_id')
            ->get();
        return response()->json(['orders' => $orders]);
    }

    public function getCustomersFrec(Request $request): JsonResponse
    {
        // Obtener las órdenes agrupadas por cliente, filtrando por mes y contando el número de órdenes
        $topCustomers = Order::select(
            'customer_id',
            DB::raw('COUNT(*) as total_orders')
        )
            ->whereMonth('date', $request->mes) // Filtrar por mes
            ->groupBy('customer_id')
            ->orderByDesc('total_orders')
            ->limit(5) // Limitar a los primeros 5 clientes
            ->get();

        // Puedes obtener los detalles de los clientes y sus órdenes si es necesario
        // Ejemplo de cómo obtener los detalles de los clientes junto con sus órdenes
        $customersWithOrders = [];
        foreach ($topCustomers as $customer) {
            $customerDetails = $customer->customer; // Suponiendo que hay una relación definida en el modelo Order
            $customersWithOrders[] = [
                'customer' => $customerDetails,
                'total_orders' => $customer->total_orders
            ];
        }
        return response()->json($customersWithOrders);
    }
}
